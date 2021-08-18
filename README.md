# ksql-stream-rendering-in-ui
1.Clone the confluentinc/cp-all-in-one GitHub repository.
2. start dockerized kafka cluster
3. import connector-users from /resouces.
    This is for having a topic with continuous flow of data.
4. Create a stream using following query
    create stream st(id string key,value string)with(kafka_topic='users',key_format='kafka',value_format='kafka');
5. execute following commands to start node server and react client
    /socket-io-server/ node app.js
    /socket-io-client/npm start

In UI we will able to see the user records in reverse order
    
