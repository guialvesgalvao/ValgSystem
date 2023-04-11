import  Coins  from '../public/moedas.png';
import  Dinheiro  from '../public/dinheiro.png';
import  Quadro  from '../public/quadro.png';

import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Headerunlogged';

export default function Home() {

  return (
    <div>
      <Header/>
      <div className='containerIndex'>
        <div className="indexDivOrg">
          <div className='divTextIndex'>
            <h2 className='display-3'>Gerencie suas finanças de forma inteligente e prática</h2>
            <p className='lead'>Não deixe o gerenciamento de suas finanças ser uma fonte de estresse - deixe nosso sistema cuidar disso para você.</p>
            <Link href="/login">
            <button className='buttonLoginIndex'>
              Saiba Mais
            </button>
            </Link>
          </div>
          <div className='divTextImage'>
            <Image
            src={Coins}
            alt="moedas"
            width={500}
            height={500}/>
          </div>
        </div>
        <div className="indexDivOrg">
          <div className='divImageIndex'>
          <Image
            src={Dinheiro}
            alt="Dinheiro"
            width={600}
            height={400}/>
          </div>
          <div className='divTextIndex'>
            <h6 className='display-5'>O sistema que vai transformar sua vida financeira </h6>
            <p className='lead'>Simplifique sua vida financeira com nosso sistema de gerenciamento de contas e inventário fácil de usar.</p>
          </div>
        </div>
        <div className="indexDivOrg">
          <div className='divTextIndex'>
            <h2  className='display-4'>Simplifique sua vida financeira e seu inventário</h2>
            <p className='lead'>Nunca mais se preocupe em esquecer de pagar uma conta importante - nosso sistema envia lembretes personalizados para você.</p>
          </div>
          <div  className='divImageIndex1'>
          <Image
          src={Quadro}
          alt="Quadro com contas"
          width={500}
          height={500}/>
          </div>
        </div>
      </div>
      <footer className='hunlDiv'>
        <span></span>
        <h5 className="h5">Valg System © <span className='h6'>Todos os direitos reservados</span></h5>
        <span></span>
        </footer>
    </div>
  )
}