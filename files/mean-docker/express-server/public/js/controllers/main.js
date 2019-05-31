angular.module('todoController', [])

	var myVar = {account:"", password:""}
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCustomer = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.account ||$scope.formData.password != undefined) {
				$scope.loading = true; 
					
				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
						window.location.href="../../login.html";
					});
					
			}
		};
		
		//登陆时检查用户的账户密码是否正确
        
		$scope.login_click = function() {
			var usernameexist = false;
			var pwdcorrect = true;
			Todos.get().success(function(data) {
				for (var i in data) {
					if (data[i]["account"] == $scope.formData.account) {
						usernameexist = true;
						if (data[i]["password"] == $scope.formData.password) {
							pwdcorrect = true;
						}
						else {
							pwdcorrect = false;
						}
					}
				}
				if (usernameexist == false) {
				    alert("您所输入的账户不存在");
				}
				else if (pwdcorrect == false) {
				    alert("密码错误！");
				}
				else {
				    alert("用户名密码正确！");
				    window.location.href = "../../customer.html";
					myVar.account =$scope.formData.account;
					myVar.password=$scope.formData.password;
				}
			})
		};
		document.getElementById("account-name").innerHTML ="Hello customer, "+ myVar.account;
		// DELETE ==================================================================
		// delete a todo after checking it
		/** $scope.deleteCustomer = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		*/
	}]);
