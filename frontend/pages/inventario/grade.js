import Image from "next/image"

export default function Grade () {
    let Materiais = [{codigo: 1, codigoIMG: 1, Nome: "Grade", Medidas: "3x2", Obs: ""},{codigo: 2, codigoIMG: 2, Nome: "Grade", Medidas: "5x6", Obs: ""},{codigo: 3, codigoIMG: 3, Nome: "Grade", Medidas: "6x6", Obs: ""},{codigo: 4, codigoIMG:4, Nome: "Grade", Medidas: "5x6", Obs: ""},{codigo: 5, codigoIMG: 5, Nome: "Grade", Medidas: "5x6", Obs: ""}]

    return (
        <div className="org-inventario">

         {Materiais.map((Materiais, key) => (
          <div className="card-inventario" key={Materiais.codigo}>

            <Image src={Materiais.codigo} alt="`${Materiais.Nome}`" />
            
            <div className="org-desc">
                <span>{Materiais.codigo}</span>
                <span>{Materiais.Nome}</span>
                <span>{Materiais.Medidas}</span>
                <span>{Materiais.Obs}</span>
            </div>

           </div>
         ))}
        </div>
    )
}