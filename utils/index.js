exports.formatRoutes = routesObj => {
  console.log("UTILS");
  const copyObj = [...routesObj];
  console.log(copyObj);
  const { route_name } = copyObj[0];
  console.log("ROUTE", route_name);

  return copyObj.map(item => {
    delete item.route_name;
    return item;
  });
  copyObj;
};
