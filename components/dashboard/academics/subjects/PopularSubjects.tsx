"use client";

import Card from "@/components/shared/Card";
import type { SubjectResponse } from "@/types/entities/subject";
import type { ClassSubjectResponse } from "@/types/entities/class-subject";

export default function PopularSubjects({
  subjects,
  classSubjects,
}: {
  subjects: SubjectResponse[];
  classSubjects: ClassSubjectResponse[];
}) {
  if (!classSubjects || classSubjects.length === 0) {
    return (
      <Card>
        <div className="p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Most Popular Subjects</h3>
          <p className="text-xs text-slate-500 mb-4">Ranked by class-assignment count</p>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-slate-500">No Class assignments are available yet.</p>
            <p className="text-xs text-slate-400 mt-1">Assign subjects to classes to see rankings.</p>
          </div>
        </div>
      </Card>
    );
  }

  const classCountBySubject: Record<string, number> = {};
  classSubjects.forEach((cs) => {
    classCountBySubject[cs.subject_id] = (classCountBySubject[cs.subject_id] || 0) + 1;
  });

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));
  const ranked = Object.entries(classCountBySubject)
    .map(([subjectId, count]) => ({
      subjectId,
      count,
      subject: subjectMap.get(subjectId),
    }))
    .filter((entry) => entry.subject)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <Card className="h-full">
      <div className="flex h-full flex-col p-5">
        <h3 className="text-sm font-semibold text-slate-900">Most Popular Subjects</h3>
        <p className="mb-4 text-xs text-slate-500">Ranked by class-assignment count</p>
        {ranked.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-sm text-slate-500">No Class assignments are available yet.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-3">
            {ranked.map((entry, idx) => (
              <div key={entry.subjectId} className="flex items-center gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#6d28d9] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900">
                  {entry.subject?.subject_name}
                </span>
                <span className="flex-shrink-0 text-xs text-slate-500">
                  {entry.count} {entry.count === 1 ? "Class" : "Classes"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
