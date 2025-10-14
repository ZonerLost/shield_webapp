import { BulbIcon, GlobeIcon, Logo } from "../ui/Icons";

export const FeatureCards = () => {
  return (
    <div className="py-8">
      {/* Mobile: 2 cols (left tall, right stacked) | Desktop: 3 cols in one row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* Left Card */}
        <div className="row-span-2 lg:row-auto bg-light-gray rounded-2xl border border-placeholder-gray/20 p-3 text-start sm:text-center flex flex-col justify-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 sm:mb-2 ">
            <Logo className="w-20 sm:w-24 sm:h-24 h-20" />
          </div>
          <h3 className="text-sm font-semibold text-text-gray font-dm-sans mb-2 sm:mb-0">
            Ask law questions.
          </h3>
          <p className="text-xs font-medium text-text-gray font-dm-sans">
            Ask questions & get accurate, citation-backed answers instantly.
          </p>
        </div>

        {/* Top Right Card */}
        <div className="bg-light-gray rounded-xl border border-placeholder-gray/20 p-2 text-start sm:text-center sm:items-center flex flex-col justify-center">
          <div className="w-8 h-8 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center mb-1 sm:mb-4">
            <GlobeIcon className="sm:w-14 sm:h-14" />
          </div>
          <h3 className="text-sm font-semibold text-text-gray font-dm-sans">
            Get citation & summaries.
          </h3>
        </div>

        {/* Bottom Right Card */}
        <div className="bg-light-gray rounded-xl border border-placeholder-gray/20 p-2 text-start sm:text-center sm:items-center flex flex-col justify-center">
          <div className="w-8 h-8 sm:w-20 sm:h-20 bg-black rounded-lg flex items-center justify-center mb-1 sm:mb-4">
            <BulbIcon className="sm:w-14 sm:h-14" />
          </div>
          <h3 className="text-sm font-semibold text-text-gray font-dm-sans">
            Access past legal queries.
          </h3>
        </div>
      </div>
    </div>
  );
};
