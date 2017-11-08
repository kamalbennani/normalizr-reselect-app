import { createSelector } from 'reselect';

const getUsersEntities = state => state.users.get('entities'); // Pick off a piece of state
const getUsersGendersEntities = state => state.users.get('entities').map(user => user.get('gender'));
const getSelectedUserIds = state => state.users.get('activeUserIds');

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

export const selectedUsersSelectors = createSelector(getUsersEntities, getSelectedUserIds, (usersEntities, usersIds) => {
  return usersEntities.filter(
    user => usersIds.contains(user.get('userId')),
  );
})
