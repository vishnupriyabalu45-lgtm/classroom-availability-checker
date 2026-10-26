var app = angular.module('tceClassroomApp', []);

app.factory('ClassroomFactory', ['$http', function($http) {

    return {
        getClassrooms: function() {
            return $http.get('http://localhost:5000/api/classrooms');
        },

        updateClassroom: function(id, data) {
            return $http.put(
                'http://localhost:5000/api/classrooms/' + id,
                data
            );
        }
    };

}]);
    

app.filter('availabilityFilter', function() {
    return function(items, statusCriteria) {
        if (!items) return [];
        if (!statusCriteria || statusCriteria === 'All') return items;
        
        return items.filter(function(item) {
            return item.status.toLowerCase() === statusCriteria.toLowerCase();
        });
    };
});

app.filter('capitalizeRoom', function() {
    return function(input) {
        if (!input) return '';
        return input.toUpperCase();
    };
});

app.controller('ClassroomController', ['$scope', 'ClassroomFactory', '$http', function($scope, ClassroomFactory, $http)  {
    
    ClassroomFactory.getClassrooms().then(function(response) {
    $scope.classrooms = response.data;
}).catch(function(error) {
    console.log("Error loading classrooms:", error);
});
    $http.get("http://localhost:5000/api/test")
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log("Backend connection error:", error);
    });

    // Registered users mock database
    $scope.registeredUsers = [
        { email: 'staff@tce.edu', password: '123456', name: 'Dr. K. Arul (Staff)', role: 'staff', roleText: 'Faculty / Staff' },
        { email: 'rep@tce.edu', password: '123456', name: 'M. Vignesh (Student Rep)', role: 'student_rep', roleText: 'Student Rep' },
        { email: 'student@tce.edu', password: '123456', name: 'S. Priya (Student)', role: 'student_view', roleText: 'Regular Student' }
    ];

    $scope.currentUser = null; // Default unauthenticated

    $scope.searchQuery = '';
    $scope.filterDept = 'All';
    $scope.filterFloor = 'All';
    $scope.filterStatus = 'All';
    $scope.filterCapacity = '0';

    $scope.timeSlots = [
        '08:30 AM - 09:20 AM',
        '09:20 AM - 10:10 AM',
        '10:30 AM - 11:20 AM',
        '11:20 AM - 12:10 PM',
        '01:10 PM - 02:00 PM',
        '02:00 PM - 02:50 PM',
        '03:10 PM - 04:00 PM',
        '04:00 PM - 04:50 PM'
    ];
    $scope.selectedTimeSlot = $scope.timeSlots[0];

    // Modals and states
    $scope.activeModal = false;
    $scope.selectedRoom = null;
    $scope.toastMessage = '';

    $scope.authModalOpen = false;
    $scope.authMode = 'login'; // 'login' or 'register'
    $scope.loginData = { email: '', password: '' };
    $scope.regData = { name: '', email: '', password: '', role: 'staff' };

    $scope.customFilters = function(room) {
        if ($scope.filterDept !== 'All' && room.department !== $scope.filterDept) {
            return false;
        }
        if ($scope.filterFloor !== 'All' && room.floor !== $scope.filterFloor) {
            return false;
        }
        var minCap = parseInt($scope.filterCapacity, 10);
        if (room.capacity < minCap) {
            return false;
        }
        return true;
    };

    $scope.getTotalClassrooms = function() {
        return $scope.classrooms.length;
    };

    $scope.getAvailableCount = function() {
        return $scope.classrooms.filter(function(r) { return r.status === 'Available'; }).length;
    };

    $scope.getOccupiedCount = function() {
        return $scope.classrooms.filter(function(r) { return r.status === 'Occupied'; }).length;
    };

    $scope.getTotalCapacity = function() {
        return $scope.classrooms.reduce(function(sum, r) { return sum + r.capacity; }, 0);
    };

    $scope.clearFilters = function() {
        $scope.searchQuery = '';
        $scope.filterDept = 'All';
        $scope.filterFloor = 'All';
        $scope.filterStatus = 'All';
        $scope.filterCapacity = '0';
        $scope.showToast('All filters reset successfully.');
    };

    $scope.openDetails = function(room) {
        $scope.selectedRoom = room;
        $scope.activeModal = true;
    };

    $scope.closeModal = function() {
        $scope.activeModal = false;
        $scope.selectedRoom = null;
    };

    // Authentication Actions
    $scope.openAuthModal = function(mode) {
        $scope.authMode = mode || 'login';
        $scope.authModalOpen = true;
    };

    $scope.closeAuthModal = function() {
        $scope.authModalOpen = false;
        $scope.loginData = { email: '', password: '' };
        $scope.regData = { name: '', email: '', password: '', role: 'staff' };
    };

    $scope.handleLogin = function() {
        var found = $scope.registeredUsers.find(function(u) {
            return u.email.toLowerCase() === $scope.loginData.email.toLowerCase() && u.password === $scope.loginData.password;
        });

        if (found) {
            $scope.currentUser = found;
            $scope.closeAuthModal();
            $scope.showToast('Welcome back, ' + found.name + '!');
        } else {
            alert('Invalid email or password. Please try demo credentials or register.');
        }
    };

    $scope.handleRegister = function() {
        if (!$scope.regData.name || !$scope.regData.email || !$scope.regData.password) return;
        
        var roleTextLabel = 'Regular Student';
        if ($scope.regData.role === 'staff') roleTextLabel = 'Faculty / Staff';
        if ($scope.regData.role === 'student_rep') roleTextLabel = 'Student Rep';

        var newUser = {
            name: $scope.regData.name,
            email: $scope.regData.email,
            password: $scope.regData.password,
            role: $scope.regData.role,
            roleText: roleTextLabel
        };

        $scope.registeredUsers.push(newUser);
        $scope.currentUser = newUser;
        $scope.closeAuthModal();
        $scope.showToast('Registration successful! Logged in as ' + newUser.name);
    };

    $scope.logout = function() {
        $scope.currentUser = null;
        $scope.showToast('Logged out successfully.');
    };

    // Booking Room Guard (Only staff or student_rep can book)
    $scope.selectRoom = function(room) {
        if (!$scope.currentUser) {
            alert('Access Restricted: Please login as a Staff or Student Representative to book classrooms.');
            $scope.openAuthModal('login');
            return;
        }

        if ($scope.currentUser.role === 'student_view') {
            alert('Notice: Regular students have view-only access. Room reservations are restricted to Faculty Staff and Student Representatives.');
            return;
        }

        // If privileged, allow booking
       ClassroomFactory.updateClassroom(room.id, {
    status: 'Occupied',
    currentSubject: 'Reserved by ' + $scope.currentUser.name,
    nextAvailable: 'Next Session'
}).then(function(response) {

    room.status = response.data.status;
    room.currentSubject = response.data.currentSubject;
    room.nextAvailable = response.data.nextAvailable;

    $scope.showToast(
        'Success! Room ' +
        room.name.toUpperCase() +
        ' has been reserved by ' +
        $scope.currentUser.name
    );

}).catch(function(error) {

    console.log("Error updating classroom:", error);
    alert("Could not reserve the classroom.");

});
    };

    $scope.showToast = function(msg) {
        $scope.toastMessage = msg;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.toastMessage = '';
            });
        }, 3500);
    };

    $scope.onTimeSlotChange = function() {
        angular.forEach($scope.classrooms, function(room) {
            room.currentTimeSlot = $scope.selectedTimeSlot;
            var rand = Math.random();
            if (rand > 0.45) {
                room.status = 'Available';
                room.currentSubject = 'N/A';
                room.nextAvailable = 'Now';
            } else {
                room.status = 'Occupied';
                var subjects = ['Algorithm Analysis', 'Digital Signal Processing', 'Machine Learning', 'Embedded Systems', 'VLSI Design', 'Theory of Computation'];
                room.currentSubject = subjects[Math.floor(Math.random() * subjects.length)];
                room.nextAvailable = 'Next Period';
            }
        });
        $scope.showToast('Schedule updated for slot: ' + $scope.selectedTimeSlot);
    };
}]);