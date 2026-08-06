import { ReactNode, Suspense, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps {
  children: ReactNode;
  fallbackHeight?: string;
}

const LazySection = ({
  children,
  fallbackHeight = "450px",
}: LazySectionProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "250px 0px",
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      setShouldLoad(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <div
              style={{ height: fallbackHeight }}
              className="flex items-center justify-center bg-gray-50"
            >
              <div className="w-8 h-8 border-4 border-[#025aa7] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {/* 👇 THIS IS THE IMPORTANT PART */}
          <div
            className={`
              scroll-animate
              ${inView ? "is-visible" : ""}
            `}
          >
            {children}
          </div>
        </Suspense>
      ) : (
        <div
          style={{ height: fallbackHeight }}
          className="w-full bg-gray-50"
        />
      )}
    </div>
  );
};

export default LazySection;