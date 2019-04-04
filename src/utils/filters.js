
/**
 * Filters for the root parent item of child Item.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {object} - the root parent item
 */
export const getParentItem = (childItem, allItems) => {
    for(let itemKey in allItems) {
        if(itemKey === childItem.parent) {
            return allItems[itemKey];
        }
    }
}

/**
 * Filters for all items that do not have an owner or are shared.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {Array} array of item objects that are ownerless or shared
 */
export const getOwnerlessItems = allItems => {
    const ownerlessItems = []
    Object.keys(allItems).map(itemKey => {
        if(allItems[itemKey].owner === 'none' || allItems[itemKey].owner === 'shared') {
            let parentItem = 'none';
            if(allItems[itemKey].parent !== 'root') parentItem = getParentItem(allItems[itemKey], allItems);
            ownerlessItems.push({
                id: itemKey, 
                data: allItems[itemKey], 
                parentItem: parentItem, 
                parentItemId: allItems[itemKey].parent});
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
            let parentItem = 'none';
            if(allItems[itemKey].parent !== 'none') parentItem = getParentItem(allItems[itemKey], allItems);
            userItems.push({
                id: itemKey, 
                data: allItems[itemKey], 
                parentItem: parentItem, 
                parentItemId: allItems[itemKey].parent});
        }
    });
    return userItems;
}

export const getChildItems = (allItems, parentItem) => {
    const childItems = [];
    parentItem.children.forEach(childItemKey => {
        let parentItem = 'none';
        if(allItems[childItemKey].parent !== 'none') parentItem = getParentItem(allItems[childItemKey], allItems);
        childItems.push({
            id: childItemKey, 
            data: allItems[childItemKey], 
            parentItem: parentItem, 
            parentItemId: allItems[childItemKey].parent});
    })
    return childItems;
}