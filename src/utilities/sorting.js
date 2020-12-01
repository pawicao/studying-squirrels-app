export const sortMethods = [
  {
    value: 'NONE',
    label: 'None',
    shortLabel: 'SORT: --',
  },
  {
    value: 'PRICE_ASC',
    label: 'Price: from lowest',
    shortLabel: 'SORT: Price ↑',
  },
  {
    value: 'PRICE_DESC',
    label: 'Price: from highest',
    shortLabel: 'SORT: Price ↓',
  },
  {
    value: 'RATING_ASC',
    label: 'Rating: from lowest',
    shortLabel: 'SORT: Rating ↑',
  },
  {
    value: 'RATING_DESC',
    label: 'Rating: from highest',
    shortLabel: 'SORT: Rating ↓',
  },
  {
    value: 'POPULARITY',
    label: 'Popularity',
    shortLabel: 'SORT: Popular',
  },
  {
    value: 'ALPHABETICAL_ASC',
    label: 'Alphabetical: A - Z',
    shortLabel: 'SORT: A-Z',
  },
  {
    value: 'ALPHABETICAL_DESC',
    label: 'Alphabetical: Z - A',
    shortLabel: 'SORT: Z-A',
  },
];

export const sortTutors = (tutors, sortMethodValue) => {
  let tutorArray = [...tutors];
  switch (sortMethodValue) {
    case 'ALPHABETICAL_ASC':
      tutorArray.sort((a, b) => a.tutor.firstName > b.tutor.firstName ? 1 : -1);
      break;
    case 'ALPHABETICAL_DESC':
      tutorArray.sort((a, b) => a.tutor.firstName > b.tutor.firstName ? -1 : 1);
      break;
    case 'PRICE_ASC':
      tutorArray.sort((a, b) => a.lowestPrice > b.lowestPrice ? 1 : -1);
      break;
    case 'PRICE_DESC':
      tutorArray.sort((a, b) => a.lowestPrice > b.lowestPrice ? -1 : 1);
      break;
    case 'RATING_ASC':
      tutorArray.sort((a, b) => a.tutor.tutorRating > b.tutor.tutorRating ? 1 : -1);
      break;
    case 'RATING_DESC':
      tutorArray.sort((a, b) => a.tutor.tutorRating > b.tutor.tutorRating ? -1 : 1);
      break;
    case 'POPULARITY':
      tutorArray.sort((a, b) => a.tutor.tutorRatingsGiven > b.tutor.tutorRatingsGiven ? -1 : 1);
      break;
    default:
      tutorArray.sort((a, b) => a.tutor.id > b.tutor.id ? 1 : -1);
  }
  return tutorArray;
};
