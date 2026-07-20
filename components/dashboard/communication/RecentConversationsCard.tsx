"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Card from "@/components/shared/Card";
import Dropdown from "@/components/shared/Dropdown";
import type { Conversation } from "@/lib/fixtures/communications-announcements-reference-fixture";

interface RecentConversationsCardProps {
  conversations: Conversation[];
  onViewConversation: (conversation: Conversation) => void;
  onViewAll: () => void;
}

type ConversationTab = "All" | "Students" | "Parents" | "Staff";

export default function RecentConversationsCard({
  conversations,
  onViewConversation,
  onViewAll,
}: RecentConversationsCardProps) {
  const [activeTab, setActiveTab] = useState<ConversationTab>("All");
  const [search, setSearch] = useState("");
  const [audience, setAudience] = useState("All");

  const filtered = useMemo(() => {
    let result = [...conversations];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.preview.toLowerCase().includes(q)
      );
    }
    if (audience !== "All") {
      result = result.filter((c) => c.title.includes(audience));
    }
    return result;
  }, [conversations, search, audience]);

  return (
    <Card className="p-0 flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">Recent Conversations</h2>
      </div>
      <div className="px-6 pt-4">
        <div className="flex items-center gap-4 border-b border-slate-200">
          {(["All", "Students", "Parents", "Staff"] as ConversationTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-[#7c3aed] border-[#7c3aed]"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
            />
          </div>
          <Dropdown value={audience} options={["All", "Students", "Parents", "Staff", "Groups"]} onChange={setAudience} className="w-32" />
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {filtered.slice(0, 5).map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onViewConversation(conversation)}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition text-left"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${conversation.avatarColor || "bg-purple-100 text-purple-700"}`}>
              {conversation.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{conversation.title}</p>
              <p className="text-xs text-slate-500 truncate">{conversation.preview}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-slate-400">{conversation.time}</span>
              {conversation.unread && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold">
                  {conversation.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-slate-200">
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View All Conversations
          <span className="text-[#7c3aed]">→</span>
        </button>
      </div>
    </Card>
  );
}
