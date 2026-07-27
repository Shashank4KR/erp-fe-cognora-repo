"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  title: string;
  description: string;
  meta: string;
  iconBg: string;
  iconColor: string;
}

export default function TeacherMessagesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        const mockMessages: Message[] = [
          { id: "1", title: "Mrs. Verma (Aarav's parent)", description: "Asked about exam schedule", meta: "10 min ago", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
          { id: "2", title: "Admin Office", description: "Marks entry deadline Fri", meta: "1 hour ago", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
          { id: "3", title: "Mr. Das", description: "Shared lesson plan", meta: "Yesterday", iconBg: "bg-green-50", iconColor: "text-green-500" },
        ];

        setMessages(mockMessages);
        setError(null);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err instanceof Error ? err.message : "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-purple-600" />
            Messages
          </h1>
          <p className="text-slate-600 mt-1">View and manage your messages</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading messages...</p>
            </div>
          </Card>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </Card>
        )}

        {!loading && !error && messages.length === 0 && (
          <Card className="border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-3 text-amber-700">
              <MessageSquare className="h-5 w-5" />
              <p>No messages yet.</p>
            </div>
          </Card>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messages.map((msg) => (
              <Card key={msg.id} className="hover:shadow-lg transition p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{msg.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{msg.description}</p>
                  </div>
                  <p className="text-xs text-slate-500">{msg.meta}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
