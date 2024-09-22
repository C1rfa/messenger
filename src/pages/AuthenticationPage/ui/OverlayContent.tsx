
interface OverlayContentProps {
  title: string;
  subtitle: string;
  overlayButtonText: string;
  onOverlayButtonClick: () => void;
};

export const OverlayContent = (props: OverlayContentProps) => {

  const { title, subtitle, overlayButtonText, onOverlayButtonClick } = props;

  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">
        {title}
      </h1>
      <h5 className="text-xl text-white">{subtitle}</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white hover:text-[#69D1C5] text-xl font-bold uppercase ring-2 ring-white hover:ring-[#69D1C5] active:scale-110 transition-transform ease-in"
          onClick={onOverlayButtonClick}
        >
          {overlayButtonText}
        </button>
      </div>
    </div>
  );
};