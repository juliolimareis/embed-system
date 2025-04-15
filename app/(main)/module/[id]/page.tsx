'use client';

import NotFound from "@/components/NotFound";
import MenuItem from "@/dtos/menu-item";
import { useFirebase } from "@/hooks/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModuleById() {
  const params = useParams();
  const { db } = useFirebase();
  const id = params.id as string;

  const [menuItem, setMenuItem] = useState<MenuItem>();

  // const modules = {
  //   "develop-patient": "https://develop.telemedicina.drtis.com.br",
  //   "develop-doctor": "https://develop.telemedicina.drtis.com.br/doctor",
  //   "interconsulta-patient": "https://interconsulta.drtis.com.br",
  //   "interconsulta-doctor": "https://interconsulta.drtis.com.br/doctor",
  // }

  useEffect(() => {
    const menuCollectionRef = doc(db, "menu", id);

    getDoc(menuCollectionRef)
      .then(doc => MenuItem.create({ id: doc.id, ...doc.data() }))
      .then(item => setMenuItem(item));

  }, [db, id]);

  return (
    <div className="w-full h-screen">
      {
        !!(menuItem?.href) ? (
          <iframe 
            src={menuItem?.href}
            width="100%"
            height="100%"
          />
        ) 
          :
        (
          <NotFound />
        )
      }
    </div>
  )
}