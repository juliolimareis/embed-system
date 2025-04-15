'use client';

export default function ModulePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        width="100%"
        height="100%"
        src={"https://develop.telemedicina.drtis.com.br"}
        allow="camera; microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  )
}