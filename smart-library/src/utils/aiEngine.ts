import { RECOMMENDED_BOOKS } from './placeholderData';
import type { Book } from '../types';

// ── Types ────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  books?: Book[];       // book results to inline-render in chat
  type?: 'text' | 'book_list' | 'tip';
}

// ── Intent detection ─────────────────────────────────────────
type Intent =
  | 'recommend'
  | 'search_book'
  | 'explain_ai'
  | 'explain_category'
  | 'reading_tip'
  | 'greeting'
  | 'thanks'
  | 'summary'
  | 'fallback';

const INTENT_PATTERNS: { intent: Intent; patterns: RegExp[] }[] = [
  { intent: 'greeting',         patterns: [/\b(hi|hello|hey|good morning|good evening)\b/i] },
  { intent: 'thanks',           patterns: [/\b(thanks|thank you|thx|ty)\b/i] },
  { intent: 'recommend',        patterns: [/\b(recommend|suggest|what should i read|find me|show me|give me)\b/i] },
  { intent: 'search_book',      patterns: [/\b(search|find|look for|do you have|is there a book)\b/i] },
  { intent: 'explain_ai',       patterns: [/\b(how does this work|what is ai|what can you do|your capabilities|about you)\b/i] },
  { intent: 'explain_category', patterns: [/\b(machine learning|deep learning|artificial intelligence|data science|philosophy|science|business|web dev)\b/i] },
  { intent: 'reading_tip',      patterns: [/\b(tip|advice|how to read|improve|speed read|habit)\b/i] },
  { intent: 'summary',          patterns: [/\b(summar|overview|tell me about|what is|describe)\b/i] },
];

function detectIntent(input: string): Intent {
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some(p => p.test(input))) return intent;
  }
  return 'fallback';
}

// ── Category extraction ──────────────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  'ai': 'Artificial Intelligence',
  'artificial intelligence': 'Artificial Intelligence',
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'data science': 'Data Science',
  'data': 'Data Science',
  'philosophy': 'Philosophy',
  'science': 'Science',
  'physics': 'Science',
  'business': 'Business',
  'web dev': 'Web Development',
  'web development': 'Web Development',
  'programming': 'Web Development',
};

function extractCategory(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return value;
  }
  return null;
}

// ── Book lookup helpers ───────────────────────────────────────
function getBooksForCategory(category: string, limit = 3): Book[] {
  return RECOMMENDED_BOOKS.filter(b => b.category === category).slice(0, limit);
}

function getTopRated(limit = 4): Book[] {
  return [...RECOMMENDED_BOOKS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

function searchBooks(query: string, limit = 3): Book[] {
  const q = query.toLowerCase();
  return RECOMMENDED_BOOKS.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q) ||
    b.keywords?.some(k => k.toLowerCase().includes(q))
  ).slice(0, limit);
}

// ── Reading tips pool ─────────────────────────────────────────
const READING_TIPS = [
  '📖 **Pomodoro Reading**: Read for 25 minutes, then take a 5-minute break. Your comprehension improves dramatically with micro-rests.',
  '🖊️ **Active Annotation**: Highlight key passages and write brief margin notes. Studies show this improves long-term retention by up to 40%.',
  '🎯 **Set a Reading Goal**: Even 20 pages a day adds up to 15–20 books a year. Consistency beats intensity.',
  '🔁 **Spaced Repetition**: Revisit chapter summaries after 1 day, 1 week, and 1 month to solidify knowledge.',
  '🌅 **Peak Cognitive Hours**: Schedule difficult reads for your morning hours when working memory is at its peak.',
  '📚 **Read Multiple Books**: Keep 2–3 books in rotation (one technical, one narrative, one light) to avoid fatigue.',
  '🧠 **Teach What You Learn**: Summarizing a chapter to someone else is the most effective retention technique — the "Feynman Technique."',
];

// ── Response generator ────────────────────────────────────────
interface GeneratedResponse {
  content: string;
  books?: Book[];
  type: 'text' | 'book_list' | 'tip';
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateResponse(userInput: string): GeneratedResponse {
  const intent = detectIntent(userInput);
  const category = extractCategory(userInput);

  switch (intent) {
    case 'greeting':
      return {
        type: 'text',
        content: `Hello! 👋 I'm **Aethelgard AI**, your intelligent research companion. I can:\n\n- 📚 **Recommend books** based on your interests\n- 🔍 **Search** the entire library by topic or author\n- 📖 **Summarize** books and chapters\n- 💡 **Share reading tips** to boost your comprehension\n\nWhat would you like to explore today?`,
      };

    case 'thanks':
      return {
        type: 'text',
        content: `You're very welcome! 🌟 Happy to help. If you'd like more book recommendations, summaries, or reading tips, just ask!`,
      };

    case 'reading_tip':
      return {
        type: 'tip',
        content: READING_TIPS[Math.floor(Math.random() * READING_TIPS.length)],
      };

    case 'recommend': {
      const cat = category ?? 'Artificial Intelligence';
      const books = getBooksForCategory(cat, 4);
      if (books.length > 0) {
        return {
          type: 'book_list',
          content: `Based on your interest in **${cat}**, here are my top picks for you. Each has been selected for its depth, clarity, and relevance to current research:`,
          books,
        };
      }
      const topBooks = getTopRated(4);
      return {
        type: 'book_list',
        content: `Here are my top-rated books across all categories — these are the highest-scoring titles in the Aethelgard library:`,
        books: topBooks,
      };
    }

    case 'search_book': {
      const words = userInput.replace(/\b(search|find|look for|do you have|is there a book|about|on)\b/gi, '').trim();
      const results = searchBooks(words, 4);
      if (results.length > 0) {
        return {
          type: 'book_list',
          content: `I found **${results.length}** matching titles in the library. Here's what I'd recommend:`,
          books: results,
        };
      }
      return {
        type: 'text',
        content: `🔍 I couldn't find an exact match, but I'd suggest browsing the **Search Books** page where you can filter by category and rating. Would you like me to recommend top-rated books instead?`,
      };
    }

    case 'explain_ai':
      return {
        type: 'text',
        content: `I'm **Aethelgard AI** — a research intelligence system built into the Aethelgard Smart Library. Here's what I can do:\n\n**📚 Book Discovery**\nI analyze your reading history, favorites, and interests to surface highly relevant books with match scores.\n\n**🔍 Semantic Search**\nI understand concepts, not just keywords. Ask me "books about consciousness and technology" and I'll find relevant titles.\n\n**📝 Summaries & Insights**\nI can summarize chapters, extract key arguments, and highlight ethical considerations.\n\n**💬 Research Chat**\nUse me like a research librarian — ask questions, get curated reading lists, explore topics.\n\nIn the future, I'll connect to a live AI backend. For now, I'm powered by curated local intelligence. What can I help you explore?`,
      };

    case 'explain_category': {
      const cat = category ?? 'Artificial Intelligence';
      const books = getBooksForCategory(cat, 3);
      return {
        type: 'book_list',
        content: `**${cat}** is one of the most active research areas in the Aethelgard library. Here's a curated overview:\n\nThis field covers foundational theory, applied research, and real-world case studies. Our collection emphasizes books with high scholarly value and practical relevance. Here are the top titles in this category:`,
        books,
      };
    }

    case 'summary': {
      const words = userInput.replace(/\b(summar|overview|tell me about|what is|describe)\b/gi, '').trim();
      const results = searchBooks(words, 1);
      if (results.length > 0) {
        const book = results[0];
        return {
          type: 'text',
          content: `📖 **${book.title}** by *${book.author}*\n\n**Category:** ${book.category} · **Rating:** ${book.rating}/5 ⭐\n\n${book.description || book.aiSummary || 'A highly regarded work in its field.'}\n\n**AI Insight:** ${book.aiSummary || 'This book offers deep exploration of its subject matter with practical applications and ethical considerations.'}\n\nWant me to add this to your reading list or find similar titles?`,
        };
      }
      return {
        type: 'text',
        content: `I'd be happy to summarize a book! Please mention the title or topic you're curious about. For example: *"Tell me about machine learning books"* or *"Summarize the top AI title."*`,
      };
    }

    default: {
      // Fallback: try a keyword search
      const results = searchBooks(userInput, 3);
      if (results.length > 0) {
        return {
          type: 'book_list',
          content: `Interesting! Based on your message, I found some relevant books you might enjoy:`,
          books: results,
        };
      }
      const fallbacks = [
        `That's a thoughtful question! I'm still expanding my knowledge base. For now, I work best with queries like:\n\n- *"Recommend books on AI"*\n- *"Find books by Alan Turing"*\n- *"Give me a reading tip"*\n- *"What books do you have on data science?"*\n\nWhat would you like to explore?`,
        `I want to give you the best answer! Could you rephrase that? Try asking:\n\n- *"What are the best books on machine learning?"*\n- *"Recommend something for a beginner"*\n- *"How do I read faster?"*`,
        `Great curiosity! Let me direct you: try asking me to **recommend books**, **search a topic**, or **share a reading tip**. I'm best as a research librarian. 📚`,
      ];
      return {
        type: 'text',
        content: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      };
    }
  }
}

// ── Public API ────────────────────────────────────────────────
export async function sendMessage(userInput: string): Promise<ChatMessage> {
  // Simulate network delay (600–1400ms)
  const delay = 600 + Math.random() * 800;
  await new Promise(resolve => setTimeout(resolve, delay));

  const response = generateResponse(userInput);

  return {
    id: generateId(),
    role: 'assistant',
    content: response.content,
    books: response.books,
    type: response.type,
    timestamp: new Date().toISOString(),
  };
}

export function getPersonalizedRecommendations(interests: string[] = []): Book[] {
  if (interests.length === 0) return getTopRated(8);

  // Score books: boost if category matches an interest
  const scored = RECOMMENDED_BOOKS.map(book => {
    const score = interests.reduce((s, interest) => {
      if (book.category.toLowerCase().includes(interest.toLowerCase())) return s + 3;
      if (book.keywords?.some(k => k.toLowerCase().includes(interest.toLowerCase()))) return s + 1;
      return s;
    }, 0) + book.rating;
    return { book, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map(s => s.book)
    .slice(0, 12);
}

export { generateId };
