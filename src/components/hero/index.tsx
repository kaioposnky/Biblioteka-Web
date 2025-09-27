import Image from "next/image";
import {Button} from "@radix-ui/themes";
import Link from "next/link";


export default function Hero(){
    return (
        <section className={"mx-40 mt-20 flex flex-row justify-between"}>
            {/*Textos do hero*/}
            <div className={"flex flex-row justify-center w-4/7"}>
                <div className={"flex flex-col items-center gap-y-5"}>
                    <h2
                        className={"flex text-6xl justify-center"}
                    >
                        Biblioteka
                    </h2>
                    <h3
                        className={"flex justify-center text-4xl"}
                    >O melhor site de empréstimo de livros</h3>
                    <p
                        className={"text-2xl"}
                    >
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </p>

                    <div className={"flex justify-center items-center text-xl border-b-emerald-700 border-2 rounded-full bg-emerald-500 hover:text-emerald-700 ease-in-out"}>
                        <Link
                            href={"/emprestimo"}
                            className={"p-2"}
                        >
                            <p>Pegar livro emprestado</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/*Imagem do hero*/}
            <div className={"w-3/7"}>
                <Image
                    src={"/hero/biblioteka-hero.png"}
                    alt={"Imagem Hero Biblioteka"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full"
                    loading={"lazy"}
                />
            </div>
        </section>
    )
}