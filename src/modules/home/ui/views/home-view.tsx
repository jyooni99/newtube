import CategoriesSection from "@/modules/home/ui/sections/categories-section";

interface HomeViewProps {
  categoryId?: string;
}

function HomeView({ categoryId }: HomeViewProps) {
  return (
    <div className="w-full max-w-[2400px] mx-auto mb-10 px-5 pt-2.5 flex flex-col gap-y-6">
      <CategoriesSection categoryId={categoryId} />
    </div>
  );
}

export default HomeView;
