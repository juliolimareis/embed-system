'use client';

import { useParams } from "next/navigation";

export default function ModuleById() {
  const params = useParams();
  const id = params.id as string;

  const modules = {
    "develop-patient": "https://develop.telemedicina.drtis.com.br",
    "develop-doctor": "https://develop.telemedicina.drtis.com.br/doctor",
    "interconsulta-patient": "https://interconsulta.drtis.com.br",
    "interconsulta-doctor": "https://interconsulta.drtis.com.br/doctor",
  }

  return (
    <div className="w-full h-screen">
      <iframe 
        src={modules[id as keyof typeof modules]}
        width="100%"
        height="100%"
      />
    </div>
  )
}