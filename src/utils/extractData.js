const extractData = (rawData) => {

  // Parse to js object
  //const parsedData = JSON.parse(jsonData);

  // Remove metadata
  const data = rawData.item;

  // Extract only needed data
  const results = data.map(result => {
    return {
      id: result.guid.text,
      title: result.title,
      size: Math.round(Number(result['newznab:attr'][1]._value) / 1048476),
      link: result.link
    }
  });
  

  return results;
}

export default extractData;