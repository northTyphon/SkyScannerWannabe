export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#FF4500] text-black font-black px-10 py-3 text-sm tracking-widest uppercase hover:bg-[#F5F0E8] transition-colors"
    >
      {text}
    </button>
  );
}
