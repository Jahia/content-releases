export const triggerRefetch = (refetchers, key) => {
    console.log('triggerRefetch key : ', key);
    const refetcher = refetchers[key];
    if (!refetcher) {
        return;
    }

    refetcher.refetch(refetcher.queryParams);
};

export const triggerRefetchAll = refetchers => {
    Object.keys(refetchers).forEach(key => triggerRefetch(refetchers, key));
};
