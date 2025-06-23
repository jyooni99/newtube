"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";
import FilterCarousel from "@/components/filter-carousel";

interface CategorySectionProps {
  categoryId?: string;
}

function CategoriesSection({ categoryId }: CategorySectionProps) {
  return (
    <Suspense fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSectionSuspense({ categoryId }: CategorySectionProps) {
  const router = useRouter();

  const [categories] = trpc.categories.getAll.useSuspenseQuery();
  const data = categories.map(({ name, id }) => ({ value: id, label: name }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
}

export default CategoriesSection;
