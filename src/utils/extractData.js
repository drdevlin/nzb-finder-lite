const extractData = (rawData) => {

  // Remove metadata
  const data = rawData.item;
  if (!data) {
    console.log(rawData);
    throw new Error('No results.');
  }

  // Extract only needed data
  const results = data.map(result => {
    return {
      id: /.{36}$/.exec(result.guid.text)[0],
      title: result.title,
      size: Math.round(Number(result['newznab:attr'][1]._value) / 1048476),
      link: result.link,
      downloadStatus: ''
    }
  });
  

  return results;
}

export default extractData;