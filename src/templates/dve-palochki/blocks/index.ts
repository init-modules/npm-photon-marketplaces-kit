export { dvePalochkiAboutSectionDefinition } from "./about-section";
export { dvePalochkiCategoryShortcutsDefinition } from "./category-shortcuts";
export { dvePalochkiContactsFormDefinition } from "./contacts-form";
export { dvePalochkiContactsMapDefinition } from "./contacts-map";
export { dvePalochkiDeliveryConditionsDefinition } from "./delivery-conditions";
export { dvePalochkiDeliverySquareDefinition } from "./delivery-square";
export { dvePalochkiFooterDefinition } from "./footer";
export { dvePalochkiHeaderDefinition } from "./header";
export { dvePalochkiHeroSliderDefinition } from "./hero-slider";
export { dvePalochkiInstagramStripDefinition } from "./instagram-strip";
export { dvePalochkiMobileBottomBarDefinition } from "./mobile-bottom-bar";
export { dvePalochkiMobileBurgerMenuDefinition } from "./mobile-burger-menu";
export { dvePalochkiRecommendedStripDefinition } from "./recommended-strip";
export { dvePalochkiReviewsListDefinition } from "./reviews-list";
export {
	dvePalochkiNotFoundScreenDefinition,
	dvePalochkiSectionHeadingDefinition,
	dvePalochkiSuccessScreenDefinition,
} from "./system-screens";

import { dvePalochkiAboutSectionDefinition } from "./about-section";
import { dvePalochkiCategoryShortcutsDefinition } from "./category-shortcuts";
import { dvePalochkiContactsFormDefinition } from "./contacts-form";
import { dvePalochkiContactsMapDefinition } from "./contacts-map";
import { dvePalochkiDeliveryConditionsDefinition } from "./delivery-conditions";
import { dvePalochkiDeliverySquareDefinition } from "./delivery-square";
import { dvePalochkiFooterDefinition } from "./footer";
import { dvePalochkiHeaderDefinition } from "./header";
import { dvePalochkiHeroSliderDefinition } from "./hero-slider";
import { dvePalochkiInstagramStripDefinition } from "./instagram-strip";
import { dvePalochkiMobileBottomBarDefinition } from "./mobile-bottom-bar";
import { dvePalochkiMobileBurgerMenuDefinition } from "./mobile-burger-menu";
import { dvePalochkiRecommendedStripDefinition } from "./recommended-strip";
import { dvePalochkiReviewsListDefinition } from "./reviews-list";
import {
	dvePalochkiNotFoundScreenDefinition,
	dvePalochkiSectionHeadingDefinition,
	dvePalochkiSuccessScreenDefinition,
} from "./system-screens";

/**
 * Every block contribution from the dve-palochki family. Listed
 * here so the kit's `module.tsx` can register them in one shot.
 */
export const dvePalochkiBlockDefinitions = [
	dvePalochkiHeaderDefinition,
	dvePalochkiFooterDefinition,
	dvePalochkiMobileBottomBarDefinition,
	dvePalochkiMobileBurgerMenuDefinition,
	dvePalochkiHeroSliderDefinition,
	dvePalochkiCategoryShortcutsDefinition,
	dvePalochkiSectionHeadingDefinition,
	dvePalochkiRecommendedStripDefinition,
	dvePalochkiInstagramStripDefinition,
	dvePalochkiAboutSectionDefinition,
	dvePalochkiContactsMapDefinition,
	dvePalochkiContactsFormDefinition,
	dvePalochkiDeliverySquareDefinition,
	dvePalochkiDeliveryConditionsDefinition,
	dvePalochkiReviewsListDefinition,
	dvePalochkiSuccessScreenDefinition,
	dvePalochkiNotFoundScreenDefinition,
] as const;

export const dvePalochkiBlockTypes = dvePalochkiBlockDefinitions.map(
	(d) => d.type,
) as readonly string[];
