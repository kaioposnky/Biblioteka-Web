import Image from "next/image";
import Link from "next/link";

export interface BookProps{
    id: number;
    title: string;
    authorName: string;
    genreName: string;
    isAvailable: boolean;
    canBorrow?: boolean;
}

export function BookItem({
    id,
    title,
    authorName,
    genreName,
    isAvailable,
    canBorrow
}: BookProps){

    return(
        <div className={"rounded-lg border-2 border-cyan-700 bg-cyan-300 p-2 w-full"}>
            <div className={"flex flex-col gap-y-3"}>
                {/*Nome do livro e autor*/}
                <div className={"flex justify-center"}>
                    <p className={"flex flex-col gap-y-0.5"}>
                        <span className={"text-xl font-bold"}>{title}</span>
                        <span className={"text-lg"}>de: {authorName}</span>
                        <span className={"text-lg"}>gênero: {genreName}</span>
                    </p>
                </div>

                <div className={"flex justify-between"}>
                    {/*    Capa do livro*/}
                    <div className={""}>
                        <Image
                            src={"/genericBook.png"}
                            alt={`Capa do livro ${title}`}
                            width={150}
                            height={150}
                        />
                    </div>
                </div>


            </div>

            {/*Carrega o botão de ver multa caso esteja atrasado*/}
            <div className={"flex justify-center gap-x-3"}>
              {isAvailable && canBorrow &&
                      <Link
                          className={"rounded-lg bg-cyan-200 border-black border-2 p-2"}
                          href={`/emprestimo/create/${id}`}>
                          Pegar emprestado
                      </Link>
              }
              { canBorrow &&
                <Link
                    className={"rounded-lg bg-cyan-200 border-black border-2 p-2"}
                    href={`/emprestimo/reservate/${id}`}>
                    Reservar emprestimo
                </Link>
              }
            </div>
        </div>
    )
}
