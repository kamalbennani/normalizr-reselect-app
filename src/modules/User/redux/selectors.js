import { createSelector } from 'reselect';

const getUsersEntities = state => state.users.get('entities');
const getUsersGendersEntities = state => state.users.get('entities').map(user => user.get('gender'));

/**
 * This is a selector that groups a list of users by their gender.
 * Output:
 * {
 *  male: <Number>,
 *  female: <Number>
 * }
 */
export const groupUsersByGender = createSelector(getUsersEntities, (usersEntities) => {
  return usersEntities.countBy(user => user.get('gender'));
});

export const groupUsersByNationality = createSelector(getUsersEntities, (usersEntities) => {
  return usersEntities.countBy(user => user.get('nat'));
});