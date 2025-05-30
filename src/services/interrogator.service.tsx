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
        `interrogation/${id}`,
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


  async interrogateImportDoc(data) {
    try {
      const response = await request(
        `interrogation/text`,
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
  


  async getInterrogationStream(id){
    try{
      const response = await request(
        `interrogation/${id}`,
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
   * Delete an interrogation query
   * @param {string} id - The ID of the query to delete
   * @returns {Promise<Object>} - The response data from the server
   */
  // async deleteQuery(id: string) {
  //   try {
  //     const response = await request(
  //       `interrogation/${id}`,
  //       "DELETE",
  //       {},
  //       true,
  //       false,
  //       false,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

// Export the Service class.
export default InterrogatorService;
