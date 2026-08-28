import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#0c0a09] flex items-center justify-center overflow-hidden">
      <CoverFlowCarousel 
        sectionLabel="BEST SELLERS"
        autoplay={true}
        autoplayDelay={3500}
      />
    </div>
  );
}
