export const parseCrew = (crew) => {
  let parsedData = {};
  
  crew.forEach((member) => {
    const { department } = member;
    
    if (!parsedData.hasOwnProperty(department)) {
      parsedData[department] = [];
    }

    parsedData[department].push(member);
  });
  
  return parsedData;
}
