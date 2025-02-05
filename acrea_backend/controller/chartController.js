const UserAuthModel = require("../models/UserAuthModel");
const UserPropertiesModel = require("../models/UserPropertiesModel");
const UserFavoritePropertiesModel = require("../models/UserFavoritePropertiesModel");


const getUserTypeCount = async (req, res) => {
  try {
    const userTypeCount = await UserAuthModel.aggregate([
      { $group: { _id: "$usrType", count: { $sum: 1 } } }
    ]);
    res.json(userTypeCount.map(item => ({ usrType: item._id, count: item.count })));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user type count." });
  }
};

const getPropertyTypeAndCityCount = async (req, res) => {
  try {
    const propertyTypes = await UserPropertiesModel.aggregate([
      { $group: { _id: "$userListingType", count: { $sum: 1 } } }
    ]);

    const propertyCities = await UserPropertiesModel.aggregate([
      { $group: { _id: "$location.city", count: { $sum: 1 } } }
    ]);

    res.json({
      propertyTypes: propertyTypes.map(item => ({ userListingType: item._id, count: item.count })),
      propertyCities: propertyCities.map(item => ({ city: item._id, count: item.count }))
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property data." });
  }
};

const getUserRegistrations = async (req, res) => {
    try {
      const registrationData = await UserAuthModel.aggregate([
        { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      ]);
      res.json(registrationData.map(item => ({ month: item._id, count: item.count })));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registration data." });
    }
  };

//   const getUserRegistrationTrend = async (req, res) => {
//     try {
//       const registrationTrend = await UserAuthModel.aggregate([
//         { $group: { _id: { $substr: ["$createdAt", 0, 7] }, count: { $sum: 1 } } },
//         { $sort: { _id: 1 } }
//       ]);
//       res.json(registrationTrend.map(item => ({ month: item._id, count: item.count })));
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch user registration trend." });
//     }
//   };
  
  const getPriceDistribution = async (req, res) => {
    try {
      const priceRanges = [
        { range: "0-50000", min: 0, max: 50000 },
        { range: "50000-100000", min: 50000, max: 100000 },
        { range: "100000-200000", min: 100000, max: 200000 },
        { range: "200000+", min: 200000, max: Number.MAX_VALUE }
      ];
      
      const priceDistribution = await Promise.all(
        priceRanges.map(async ({ range, min, max }) => {
          const count = await UserPropertiesModel.countDocuments({
            usrPrice: { $gte: min, $lt: max }
          });
          return { range, count };
        })
      );
  
      res.json(priceDistribution);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch price distribution." });
    }
  };
  
  const getTopFavoriteProperties = async (req, res) => {
    try {
      // Aggregate to count how many times each propertyId appears
      const topFavoriteProperties = await UserFavoritePropertiesModel.aggregate([
        {
          $group: {
            _id: "$propertyId",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },   // Sort by count in descending order
        { $limit: 5 }               // Limit to top 5 properties
      ]);
  
      // Fetch property details for the top 5 properties
      const propertyIds = topFavoriteProperties.map(item => item._id);
      const favoritePropertiesDetails = await UserPropertiesModel.find({ _id: { $in: propertyIds } })
        .select("usrListingName usrPropertyFavorites");
  
      // Attach the count to the property details
      const result = favoritePropertiesDetails.map(property => {
        const countData = topFavoriteProperties.find(item => item._id.toString() === property._id.toString());
        return {
          ...property._doc,
          favoriteCount: countData.count
        };
      });
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch favorite properties." });
    }
  };
  

module.exports = { getUserTypeCount, getPropertyTypeAndCityCount,getUserRegistrations,
                // getUserRegistrationTrend,
                 getPriceDistribution, getTopFavoriteProperties };
