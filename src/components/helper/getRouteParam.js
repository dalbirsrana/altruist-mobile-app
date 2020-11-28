export default function getRouteParam(route, paramName, defualt = null) {
    if (
        typeof route !== "undefined" &&
        typeof route.hasOwnProperty('params') &&
        typeof route.params !== "undefined" &&
        typeof route.params.hasOwnProperty(paramName)
    ) {
        if (paramName === "postTypeIdProp") {
            // console.log( route.params );
            // console.log( route.key , paramName , route.params[paramName]  );
        }
        if (typeof route.params[paramName] === "undefined") {
            // console.log( "defualt" , paramName , defualt ) ;
            return defualt;
        }
        // console.log( "paramName" , paramName , route.params[paramName] ) ;
        return route.params[paramName];
    }
    // console.log( "NOT exist" , paramName ,"routeInfo" , route);
    if (defualt !== null) {
        return defualt;
    }
    return false;
}