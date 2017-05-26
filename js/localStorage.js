
(function() {

'use strict';

//=============================================================================
  

var pets = [];
var ITEMS_KEY = "LSDB_items"
var nextId = 1000;
  
getPet();  
displayPet();


$('#new-pet').on( 'click', addNewPet );
$('#pets').on( 'click', '.edit', editPet );
$('#pets').on( 'click', '.delete', confirmAndDeletePet );


//=============================================================================

function getPet(){
  try {
      var petsString = localStorage[ ITEMS_KEY];
    if (petsString) {
      pets = JSON.parse (petsString);
      nextID = getNextId();
    }
  }  catch (excptn) {
    console.error ('Unable to read or parse localStorage items');
  }
  
  function getNextId() {
    var maxId = 1000;
    pets.forEach( function( person) {
      if ( +pets._id > maxId) {
        maxId = +pets.id;
      }
    });
    return maxId + 1;
  }
}


//=============================================================================

function displayPet( ) {
    var i, len, pet;
    var tr, td, button;

    $('#pets').empty();

    for ( i = 0, len = pets.length; i < len; ++i ) {
        pet = pets[ i ];
        tr = $( '<tr data-id="' + pet.id + '">' );
        td = $( '<td>' );
        td.text( pet.name );
        tr.append( td );
        td = $( '<td>' );
        td.text( pet.breed );
        tr.append( td );
        td = $( '<td>' );
        button = $( '<button type="button" class="edit">' );
        button.text( 'Edit' );
        td.append( button );
        button = $( '<button type="button" class="delete">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );

        $('#pets').append( tr );
    }

    $('#table-page').show();
    $('#form-page').hide();
}

//=============================================================================

function addNewPet( ) {
    addOrEditPet( );
}
//=============================================================================

function editPet( evt ) {
    var i = indexOfEventPet( evt );
    if ( i >= 0 ) {
        addOrEditPet( pets[ i ] );
    }
}

//-----------------------------------------------------------------------------

function confirmAndDeletePet( evt ) {
    var i = indexOfEventPet( evt );
    if ( i >= 0 ) {
        if ( window.confirm( 'Are you sure you want to delete "' +
                             pets[ i ].name + '"?' ) ) {
            deletePet( i );
            displayPet( );
        }
    }

    //-------------------------------------------------------------------------
    function deletePet( idx ) {
        pets.splice( idx, 1 );
        localStorage [ ITEMS_KEY ]= JSON.stringify( pets );
    }
}

//-----------------------------------------------------------------------------


function indexOfEventPet( evt ) {
    var btn = evt.target;
    var tr = $(btn).closest( 'tr' );
    var id = tr.attr( 'data-id' );
    var i, len;
    for ( i = 0, len = pets.length; i < len; ++i ) {
        if ( pets[ i ].id === id ) {
            return i;
        }
    }
    return -1;
}

//=============================================================================

function addOrEditPet( pet ) {
    if ( pet ) {
        $('#name').val( pet.name );
        $('#breed').val( pet.breed );
    } else {
        $('#name').val( '' );
        $('#breed').val( '' );
    }
    $('#submit').one( 'click', addOrUpdatePet );
    $('#cancel').one( 'click', displayPet );

    $('#table-page').hide();
    $('#form-page').show();

 //=========================================================================

    function addOrUpdatePet( evt ) {
        var newPet;
        evt.preventDefault( );
        if ( pet ) {
            pet.name = $('#name').val();
            pet.breed = $('#breed').val();
        } else {
            newPet = {
                id: (nextId++).toString(),
                name: $('#name').val(),
                breed: $('#breed').val()
            };
            pets.push( newPet );
        }
        localStorage[ ITEMS_KEY] = JSON.stringify( pets );
        displayPet( );
    }
}

//=============================================================================

})();
