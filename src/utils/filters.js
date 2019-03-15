
/**
 * Filters for the root parent item of child Item.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {object} - the root parent item
 */
export const getRootParentItem = (childItem, allItems) => {
    for(let itemKey in allItems) {
        if(itemKey === childItem.parent) {
            if(allItems[itemKey].parent === 'root') return allItems[itemKey];
            else getRootParentItem(allItems, allItems[itemKey]);
        }
    }
}

/**
 * Filters for all items that do not have an owner.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {Array} array of item objects that are ownerless
 */
export const getOwnerlessItems = allItems => {
    const ownerlessItems = []
    Object.keys(allItems).map(itemKey => {
        if(allItems[itemKey].owner === 'none') {
            let rootParentItem = 'none';
            if(allItems[itemKey].parent !== 'none') rootParentItem = getRootParentItem(allItems[itemKey], allItems);
            ownerlessItems.push({id: itemKey, data: allItems[itemKey], rootParentItem: rootParentItem});
        }
    });
    return ownerlessItems;
}

/**
 * Filters for all items that belong to user.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {Array} array of item objects owned by the user
 */
export const getUserItems = (allItems, uid) => {
    const userItems = [];
    Object.keys(allItems).map(itemKey => {
        if(allItems[itemKey].owner === uid) {
            let rootParentItem = 'none';
            if(allItems[itemKey].parent !== 'none') rootParentItem = getRootParentItem(allItems[itemKey], allItems);
            userItems.push({id: itemKey, data: allItems[itemKey], rootParentItem: rootParentItem});
        }
    });
    return userItems;
}