import {GetBreweriesNamesAndIds} from "../api/catalog-beer";
import Card from "../../components/Card";

export default function Bracket({allBreweriesData}) {
    var breweryCards = allBreweriesData.map((breweryObj) => 
        <Card name={breweryObj.name}/>
    );

    return (
        <div class="container">
            <div className="cards">
                {breweryCards}
            </div>
            
            <div className="bracket">
                
            </div> 
        </div>
    );
    

}

export async function getStaticProps() {
    const allBreweriesData = await GetBreweriesNamesAndIds()
    return {
        props: {
        allBreweriesData
        }
    }
}