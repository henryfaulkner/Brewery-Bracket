import BreweryObject from "./BreweryObject";
import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     BracketsBreweryObject:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The BreweryObject DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Name:
 *           type: string
 *           description: The brewery's name.
 *           example: "Creature Comfort Brewery"
 *         Description:
 *           type: string
 *           description: Full description of brewery.
 *           example: "It's a great brewery in Athens, GA. Go Dawgs!"
 *         Short_Description:
 *           type: string
 *           description: Abbreviated description of brewery.
 *           example: "A brewery in Athens, GA. Go Dawgs!"
 *         Url:
 *           type: string
 *           description: Brewery's website url.
 *           example: https://creaturecomfortsbeer.com/
 *         Facebook_Url:
 *           type: string
 *           description: Brewery's Facebook url.
 *           example: https://www.facebook.com/CreatureComfortsBeer/
 *         Twitter_Url:
 *           type: string
 *           description: Brewery's Twitter url.
 *           example: https://mobile.twitter.com/creaturebeer
 *         Instagram_Url:
 *           type: string
 *           description: Brewery's Instagram url.
 *           example: https://www.instagram.com/creaturecomfortsbeer/
 *         Address:
 *           type: string
 *           description: Brewery's address.
 *           example: 271 W Hancock Ave, Athens, GA 30601
 *         TotalAggregateScore:
 *           type: number
 *           description: Averaged AggregateBeerScore, AggregateEnvironmentScore, AggregateLocationScore scores.
 *           example: 3
 *         AggregateBeerScore:
 *           type: number
 *           description: Averaged BeerScore from all scorecards for this bracket's brewery.
 *           example: 3
 *         AggregateEnvironmentScore:
 *           type: number
 *           description: Averaged Environment from all scorecards for this bracket's brewery.
 *           example: 3
 *         AggregateLocationScore:
 *           type: number
 *           description: Averaged Location from all scorecards for this bracket's brewery.
 *           example: 3
 */
class BracketsBreweryObject extends BreweryObject {
  public TotalAggregateScore: number;
  public AggregateBeerScore: number;
  public AggregateEnvironmentScore: number;
  public AggregateLocationScore: number;
  public Order: number;

  public constructor(json) {
    super(json);
    this.TotalAggregateScore = json["TotalAggregateScore"] ?? 0;
    this.AggregateBeerScore = json["AggregateBeerScore"] ?? 0;
    this.AggregateEnvironmentScore = json["AggregateEnvironmentScore"] ?? 0;
    this.AggregateLocationScore = json["AggregateLocationScore"] ?? 0;
    this.Order = json["Order"] ?? 100;
  }
}

export default BracketsBreweryObject;
