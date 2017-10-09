//region {variables and functions}
var greeting = "Hello World!";
var bookmark1 = {
	title : "MyBookmark1",
	url : "" //If url is null or missing, created bookmark will be a folder
};
var bookmark2 = {
	title : "MyBookmark2",
	url : "http://www.example.org"
};
var queryObject = {
	query : "",
	url : "",
	title : "chrome extensions"
};
var queryString = "example url";
//end-region



//region {calls}
console.log(greeting);
/*
chrome.bookmarks.create(bookmark1,function(result) { //result is of type BookmarkTreeNode
	console.log("Created bookmark with id: " + result.id);
	bookmark2.parentId = result.id;
	chrome.bookmarks.create(bookmark2);
});
*/
/*
chrome.bookmarks.get("1234",function(results) { //string or array of string id
	console.log(results); //array of BookmarkTreeNode
});
*/
/*
chrome.bookmarks.update("1234",{"title":"Example URL"}); //only title and url are supported
*/
chrome.bookmarks.search(queryString,function(results) { //string or object query
	console.log(results); //array of BookmarkTreeNode
});
//end-region