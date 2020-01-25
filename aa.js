io.on('connection', (socket) => {
    // handle host joining
    socket.on('host join', () => {
      socket.host = true
  
      // create room
      const roomId = ID()
      socket.roomId = roomId
      rooms[roomId] = new Room(socket)
      socket.room = rooms[roomId]
      socket.emit('host room info', { roomId: roomId, clientLength: socket.room.clients.length })
      console.log('Host ' + socket.id + ' has joined and created room ' + roomId)
    })
  
    // handle client joining
    socket.on('client join', (roomId) => {
      socket.host = false
      socket.roomId = roomId
      socket.room = rooms[roomId]
      rooms[roomId].clients.push(socket)
  
      socket.room.host.emit('host room info', { roomId: roomId, clientLength: socket.room.clients.length })
      console.log('Client ' + socket.id + ' has joined room ' + roomId)
    })
  
    socket.on('disconnect', (reason) => {
      console.log((socket.host) ? 'Host ' + socket.id + " has left, because of '" + reason + "'." : 'Client ' + socket.id + " has left, because of '" + reason + "'.")
  
      if (socket.host) {
        // if room is host, remove room entirely
        delete rooms[socket.roomId]
        // TODO: have clients timeout when room deleted
      } else if (socket.room) {
        // if socket is host, remove from clients array, then update host
        socket.room.clients = socket.room.clients.filter((obj) => { return obj.id != socket.id })
        socket.room.host.emit('host room info', { roomId: socket.roomId, clientLength: socket.room.clients.length })
      }
    })
  })