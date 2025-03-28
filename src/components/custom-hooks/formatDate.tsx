function useFormatDate(date) {
    const _date = new Date(date);
  
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(_date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
  
  export default useFormatDate;
  