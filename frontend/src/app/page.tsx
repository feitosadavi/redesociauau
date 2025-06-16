import { Metadata } from "next";
import DefaultLayout from "@/app/@components/Layouts/DefaultLaout";
import React from "react";
import { POSTAGENS_API } from "@/api";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default async function Home() {
  const postagens = await POSTAGENS_API.list();

  return (
    <>
      <DefaultLayout>
        <div className="flex items-center justify-center flex-col">
          {postagens.map(({ _id }) => (
            <div key={_id}>sdf</div>
          ))}
        </div>
        {/* <ECommerce /> */}
      </DefaultLayout>
    </>
  );
}
