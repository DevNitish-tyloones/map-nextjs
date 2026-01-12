"use client";

type Question = {
  questionText: string;
  answer: string;
};

type Category = {
  Question: (Question | null)[];
};

type ReportData = {
  CategoryFolder?: {
    Category?: Category[];
  };
};

export default function ReportTable({
  reportData,
}: {
  reportData: ReportData;
}) {
  const questions =
    reportData?.CategoryFolder?.Category?.[0]?.Question
      ?.filter(
        (item): item is Question =>
          Boolean(item && item.questionText && item.answer)
      ) ?? [];

  if (questions.length === 0) {
    return (
      <div className="mt-6 text-sm text-gray-600">
        No environmental screening results available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mt-6 bg-white rounded-lg shadow-lg overflow-hidden">

      {/* Table Title */}
      <div className="bg-blue-700 text-white px-5 py-3 text-sm font-semibold">
        National Environmental Screening Report
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">

          {/* Table Head */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700 w-[85%]">
                Project Location
              </th>
              <th className="border px-4 py-3 text-center font-semibold text-gray-700 w-[15%]">
                Result
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {questions.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-200"
                } hover:bg-blue-50`}
              >
                <td className="border px-4 py-2 text-gray-800 leading-relaxed hover:cursor-pointer">
                  {item.questionText}
                </td>

                <td className="border px-4 py-2 text-center font-bold">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      item.answer === "yes"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.answer.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
