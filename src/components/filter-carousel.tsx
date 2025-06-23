"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "./ui/skeleton";

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: { value: string; label: string }[];
}

function FilterCarousel({ value, isLoading, onSelect, data }: FilterCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length); // scrollSnapList()는 슬라이드가 몇 개 있는지 배열로 반환
    setCurrent(api.selectedScrollSnap() + 1); // selectedScrollSnap()은 현재 선택된 슬라이드의 인덱스(0-based)를 반환

    // 사용자가 Carousel을 이동할 때마다 current에 반영
    api?.on("select", () => {
      setCurrent(api?.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {/* 왼쪽 페이드 효과 */}
      <div
        className={cn(
          "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
          current === 1 && "hidden"
        )}
      />

      {/* 카테고리 */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-3">
          {/* All 버튼 */}
          {!isLoading && (
            <CarouselItem className="pl-3 basis-auto" onClick={() => onSelect(null)}>
              <Badge
                variant={!value ? "default" : "secondary"}
                className="rounded-lg px-3 py-2 cursor-pointer whitespace-nowrap text-sm"
              >
                All
              </Badge>
            </CarouselItem>
          )}

          {/* 로딩 스켈레톤 역할 */}
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => (
              <CarouselItem key={index} className="pl-3 basis-auto">
                <Skeleton className="rounded-lg px-3 py-1 h-[38px] text-sm w-[100px] font-semibold" />
              </CarouselItem>
            ))}

          {/* All 제외 카테고리 */}
          {!isLoading &&
            data.map((item) => (
              <CarouselItem
                key={item.value}
                className="pl-3 basis-auto"
                onClick={() => onSelect(item.value)}
              >
                <Badge
                  variant={value === item.value ? "default" : "secondary"}
                  className="rounded-lg px-3 py-2 cursor-pointer whitespace-nowrap text-sm"
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>

      {/* 오른쪽 페이드 효과 */}
      <div
        className={cn(
          "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none",
          current === count && "hidden"
        )}
      />
    </div>
  );
}

export default FilterCarousel;
