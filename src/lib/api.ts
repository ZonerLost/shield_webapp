const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || 'Success',
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export const authApi = {
  signup: async (data: { fullName: string; email: string; password: string }) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyOTP: async (data: { email: string; otp: string }) => {
    return apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  resendOTP: async (data: { email: string }) => {
    return apiRequest('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUser: async (userId: string) => {
    return apiRequest(`/auth/user/${userId}`, {
      method: 'GET',
    });
  },

  updateUser: async (userId: string, data: { fullName?: string; phoneNumber?: string; gender?: string; dateOfBirth?: string }) => {
    return apiRequest(`/auth/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (userId: string, data: { currentPassword: string; newPassword: string }) => {
    return apiRequest(`/auth/user/${userId}/change-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  forgotPassword: async (data: { email: string }) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export const narrativeApi = {
  generate: async (data: {
    userId: string;
    draftId?: string;
    callSign: string;
    date: string;
    time: string;
    location: string;
    victim: string;
    suspect: string;
    witnesses?: string;
    reasonForAttendance: string;
    details: string;
    antecedents?: string;
    exhibits: string | string[];
    outcome: string;
    options?: { versionCount?: number };
  }) => {
    // Convert exhibits to array if it's a string
    const exhibitsArray = Array.isArray(data.exhibits) 
      ? data.exhibits 
      : data.exhibits.split(/[\n,]/).map(item => item.trim()).filter(Boolean);

    const payload = {
      input: {
        userId: data.userId,
        draftId: data.draftId,
        callSign: data.callSign,
        date: data.date,
        time: data.time,
        location: data.location,
        victim: data.victim,
        suspect: data.suspect,
        witnesses: data.witnesses || '',
        reasonForAttendance: data.reasonForAttendance,
        details: data.details,
        antecedents: data.antecedents || '',
        exhibits: exhibitsArray,
        outcome: data.outcome,
      },
      options: data.options || { versionCount: 1 },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/narrative/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Show more helpful error message if available
        const errorMessage = responseData.message || responseData.error || 'Failed to generate narrative';
        return {
          success: false,
          message: errorMessage,
          data: null,
          missingFields: responseData.missingFields,
        };
      }

      return {
        success: true,
        message: 'Narrative generated successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('Narrative generation failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },

  autosave: async (draftId: string, data: {
    userId: string;
    callSign: string;
    date: string;
    time: string;
    location: string;
    victim: string;
    suspect: string;
    witnesses?: string;
    reasonForAttendance: string;
    details: string;
    antecedents?: string;
    exhibits: string | string[];
    outcome: string;
  }) => {
    const exhibitsArray = Array.isArray(data.exhibits) 
      ? data.exhibits 
      : data.exhibits.split(/[\n,]/).map(item => item.trim()).filter(Boolean);

    const payload = {
      userId: data.userId,
      draftId,
      callSign: data.callSign,
      date: data.date,
      time: data.time,
      location: data.location,
      victim: data.victim,
      suspect: data.suspect,
      witnesses: data.witnesses || '',
      reasonForAttendance: data.reasonForAttendance,
      details: data.details,
      antecedents: data.antecedents || '',
      exhibits: exhibitsArray,
      outcome: data.outcome,
    };

    return apiRequest(`/narrative/drafts/${draftId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  getDraft: async (draftId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/narrative/drafts/${draftId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to fetch draft',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Draft fetched successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('Get draft failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },

  getUserDrafts: async (userId: string) => {
    return apiRequest(`/narrative/user/${userId}/drafts`, {
      method: 'GET',
    });
  },
};

export const smfApi = {
  generate: async (data: {
    userId: string;
    narrativeId?: string;
    narrative: string;
    officerName?: string;
    referenceId?: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/smf/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to generate SMF',
          data: null,
        };
      }

      return {
        success: true,
        message: 'SMF generated successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('SMF generation failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },

  getSmf: async (smfId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/smf/${smfId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to fetch SMF',
          data: null,
        };
      }

      return {
        success: true,
        message: 'SMF fetched successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('Get SMF failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },

  getUserSmfs: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/smf/user/${userId}/smfs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to fetch user SMFs',
          data: null,
        };
      }

      return {
        success: true,
        message: 'User SMFs fetched successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('Get user SMFs failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },
};

export const nexusApi = {
  query: async (question: string) => {
    try {
      // Get userId from user object in localStorage (same as other components)
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (userId) {
        headers['x-user-id'] = userId;
      }

      const response = await fetch(`${API_BASE_URL}/nexus/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ question }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to get answer',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Answer received successfully',
        data: responseData,
      };
    } catch (error) {
      console.error('Nexus query failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        data: null,
      };
    }
  },
  getSuggestedPrompts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/nexus/suggested-prompts`);
      const responseData = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to get suggested prompts',
          data: [],
        };
      }

      return {
        success: true,
        message: 'Suggested prompts received',
        data: responseData.data || [],
      };
    } catch (error) {
      console.error('Failed to get suggested prompts:', error);
      return {
        success: false,
        message: 'Network error',
        data: [],
      };
    }
  },
};

export const chatHistoryApi = {
  getChats: async () => {
    try {
      // Get userId from user object in localStorage (same as other components)
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
          data: [],
        };
      }

      const response = await fetch(`${API_BASE_URL}/chat-history`, {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to get chat history',
          data: [],
        };
      }

      return {
        success: true,
        message: 'Chat history received',
        data: responseData.data || [],
      };
    } catch (error) {
      console.error('Failed to get chat history:', error);
      return {
        success: false,
        message: 'Network error',
        data: [],
      };
    }
  },
  deleteChat: async (chatId: string) => {
    try {
      // Get userId from user object in localStorage (same as other components)
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      const response = await fetch(`${API_BASE_URL}/chat-history/${chatId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to delete chat',
        };
      }

      return {
        success: true,
        message: 'Chat deleted successfully',
      };
    } catch (error) {
      console.error('Failed to delete chat:', error);
      return {
        success: false,
        message: 'Network error',
      };
    }
  },
};

export const notificationsApi = {
  getNotifications: async (limit?: number) => {
    try {
      // Get userId from user object in localStorage
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
          data: [],
        };
      }

      const url = limit 
        ? `${API_BASE_URL}/notifications?limit=${limit}`
        : `${API_BASE_URL}/notifications`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to get notifications',
          data: [],
        };
      }

      return {
        success: true,
        message: 'Notifications received',
        data: responseData.data || [],
      };
    } catch (error) {
      console.error('Failed to get notifications:', error);
      return {
        success: false,
        message: 'Network error',
        data: [],
      };
    }
  },
  getUnreadCount: async () => {
    try {
      // Get userId from user object in localStorage
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          count: 0,
        };
      }

      const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          count: 0,
        };
      }

      return {
        success: true,
        count: responseData.count || 0,
      };
    } catch (error) {
      console.error('Failed to get unread count:', error);
      return {
        success: false,
        count: 0,
      };
    }
  },
  markAsRead: async (notificationId: string) => {
    try {
      // Get userId from user object in localStorage
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to mark notification as read',
        };
      }

      return {
        success: true,
        message: 'Notification marked as read',
      };
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      return {
        success: false,
        message: 'Network error',
      };
    }
  },
  markAllAsRead: async () => {
    try {
      // Get userId from user object in localStorage
      let userId = '';
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.userId || '';
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      
      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'x-user-id': userId,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'Failed to mark all notifications as read',
        };
      }

      return {
        success: true,
        message: 'All notifications marked as read',
      };
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      return {
        success: false,
        message: 'Network error',
      };
    }
  },
};

