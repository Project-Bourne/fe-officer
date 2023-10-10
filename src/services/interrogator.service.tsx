import { request } from "../hooks/api";

class InterrogatorService {
  /**
   * Create a new Analysis.
   * @param {Object} data - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async sendQuery(data) {
    try {
      const response = await request(
        `interrogation`,
        "POST",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  async sendQuestion(id, data) {
    try {
      const response = await request(
        `interrogations/${id}`,
        "POST",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  async getAllQueries(){
    try{
      const response = await request(
        `interrogation/`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch(error){
      throw error
    }
  }
  



  /**
   * Get a workspace by its ID.
   * @param {string} - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  
}

// Export the Service class.
export default InterrogatorService;
