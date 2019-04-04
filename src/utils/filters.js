
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
            else return getRootParentItem(allItems[itemKey], allItems);
        }
    }
}

/**
 * Filters for the parent item of child Item.
 * @constructor
 * @param {object} allItems - an item object filled with items
 * @returns {object} - the parent item
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
            let rootParentItem = 'none';
            let parentItem = 'none';
            if(allItems[itemKey].parent !== 'none') {
                rootParentItem = getRootParentItem(allItems[itemKey], allItems);
                parentItem = getParentItem(allItems[itemKey], allItems);
            }
            ownerlessItems.push({
                id: itemKey, 
                data: allItems[itemKey], 
                rootParentItem: rootParentItem, 
                parentItem: parentItem, 
                parentItemId: allItems[itemKey].parent
            });
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
            let parentItem = 'none';
            if(allItems[itemKey].parent !== 'none') {
                rootParentItem = getRootParentItem(allItems[itemKey], allItems);
                parentItem = getParentItem(allItems[itemKey], allItems);
            }
            userItems.push({
                id: itemKey, 
                data: allItems[itemKey], 
                rootParentItem: rootParentItem,
                parentItem: parentItem, 
                parentItemId: allItems[itemKey].parent
            });
        }
    });
    return userItems;
}

export const getChildItems = (allItems, parentItem) => {
    const childItems = [];
    parentItem.children.forEach(childItemKey => {
        let rootParentItem = 'none';
        let parentItem = 'none';
        if(allItems[childItemKey].parent !== 'none') {
            rootParentItem = getRootParentItem(allItems[childItemKey], allItems);
            parentItem = getParentItem(allItems[childItemKey], allItems);
        }
        childItems.push({
            id: childItemKey, 
            data: allItems[childItemKey], 
            rootParentItem: rootParentItem,
            parentItem: parentItem, 
            parentItemId: allItems[childItemKey].parent 
        });
    })
    return childItems;
}