import { api } from './api';

export const interestService = {
  /**
   * Get all available interest categories in the system (for Welcome/onboarding page).
   * GET /api/interests — returns full list without passing invalid userId=0
   */
  getAllInterests: async () => {
    const res = await api.get('/interests');
    const data = res.data?.data || res.data;
    return Array.isArray(data) ? data : (data?.content || []);
  },

  /**
   * Get interest topics associated with a specific user.
   * GET /api/interests?userId={userId}
   */
  getUserInterests: async (userId: number) => {
    if (!userId || userId <= 0) return [];
    const res = await api.get('/interests', { params: { userId } });
    const data = res.data?.data || res.data;
    return Array.isArray(data) ? data : (data?.content || []);
  },

  /**
   * Add a new interest category to the system.
   * POST /api/interests
   */
  addInterest: async (interestName: string) => {
    const res = await api.post('/interests', { interestName });
    return res.data?.data || res.data;
  },

  /**
   * Save/update user's selected interests.
   * PUT /api/interests?userId={userId}
   * Body: array of interest IDs
   */
  updateUserInterests: async (userId: number, interestIds: number[]) => {
    if (!userId || userId <= 0) return;
    const res = await api.put('/interests', interestIds, { params: { userId } });
    return res.data?.data || res.data;
  },
};
