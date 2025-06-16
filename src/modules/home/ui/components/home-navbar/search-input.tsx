import { SearchIcon } from "lucide-react";
import React from "react";

export function SearchInput() {
  // Todo: 검색 기능 구현
  return (
    <form className="min-[530px]:flex w-full max-w-[600px] hidden">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
        />
        {/* Todo: 검색어 제거 버튼 추가 */}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
}
