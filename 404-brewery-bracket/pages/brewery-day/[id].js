import {useRouter} from "next/router"
import {GetAllBeersFromGivenBrewery} from "../api/catalog-beer"

export default function BreweryDay({breweryObj}) {
    console.log(breweryObj)

    var beerCards = breweryObj.beers.map(beer => {
        <Card name={beer.name}/>
    })

    return (
        <div>
            <h1 class="brewery-title">{breweryObj.name}</h1>
            {/* {beerCards} */}
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps() {
    const router = useRouter();
    const {id} = router.query;
    var breweryObj = await GetAllBeersFromGivenBrewery(id);

    return {
      props: {
        breweryObj
      }
    }
  }