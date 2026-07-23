// clearAuth: () => {
//     set ({ authUser: null, isCheckingAuth: false, onlineUsers: [] });
//     get().disconnectSocket();
// },
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from 'socket.io-client';


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://amebo-b.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    onlineUsers: [],
    socket: null,

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/register", data);

            set({
                authUser: res.data,
            });

            get().connectSocket(res.data);

            return { success: true, user: res.data, };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Something went wrong",
            };
        } finally {
            set({
                isSigningUp: false,
            });
        }
    },

    login: async (data) => {
        set({
            isLoggingIn: true,
        });

        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({
                authUser: res.data,
            });

            get().connectSocket(res.data);

            return { success: true, user: res.data, };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Invalid credentials",
            };
        } finally {
            set({
                isLoggingIn: false,
            });
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, });

        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket(res.data)

        } catch(error) {
            console.error("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    connectSocket: (user) => {
        if (!user || get().socket?.connected) return;

        const socket = io(BASE_URL,  {withCredentials: true, query: { userId:user._id}})

        set({socket})

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers:userIds})
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) socket.disconnect();
        set({ socket: null });
    },

    logout: async () => {
        set({ isLoggingOut: true });

        try {
            await axiosInstance.post("/auth/logout");

            get().disconnectSocket();

            set({
                authUser: null,
                onlineUsers: [],
            });
        } catch (error) {
            console.error("Logout Error:", error);
        } finally {
            set({
                isLoggingOut: false,
            });
        }
    },
}));