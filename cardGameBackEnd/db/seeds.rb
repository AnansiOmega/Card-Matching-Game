# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# create_table :users do |t|
#     t.string :username

#     create_table :games do |t|
#         t.integer :user_id
#         t.integer :points
#         t.boolean :completed, default: false
  
#         create_table :game_matches do |t|
#             t.integer :game_id
#             t.integer :match_id
      
#             def change
#                 create_table :matches do |t|
#                   t.string :english_word
#                   t.string :spanish_word
#                   t.string :img_url
puts "destroying...💥"
Match.destroy_all
User.destroy_all

english_word_arr = ['School','Car','Pen','Boat','Dog','Cat','Bird','Fish','Mushroom','Cucumber','Onion','Corn','Meat','Fruit','Water','Juice','Soda','Library','Restuarant','Hospital','Doctor','Nurse','Medicine','Grandparents','Father','Mother','Son','Daughter','Baby','Red','Blue','Green','Yellow','Pink','Purple','Cup','Plate','Spoon','Fork','Pot','Oil','Shirt','Pants','Sweater','Socks','Shoes','Body','Head','Legs']

spanish_word_arr = ['Escuela','Carro','Pluma','Barco','Perro','Gato','Pajaro','Pez','Hongo','Pepino','Cebolla','Elote','Carne','Fruta','Agua','Jugo','Refresco','Biblioteca','Restaurante','Hospital','Doctor','Enfermera','Medicina','Abuelos','Padre','Madre','Hijo','Hija','Bebé','Rojo','Azul','Verde','Amarillo','Rosa','Morado','Vaso','Plato','Cuchara','Tenedor','Olla','Aceite','Camisa','Pantalones','Suéter','Calcetín','Zapatos','Cuerpo','Cabeza','Piernas']

puts "Seeding words...🖍"
english_word_arr.zip(spanish_word_arr).each do |english_word, spanish_word|
    Match.create(
        spanish_word: spanish_word,
        english_word: english_word,
        img_url: "Not Available"
    )

 
end
puts "Seeding User...👨‍💻"
10.times do 
    User.create(username: Faker::FunnyName.name)

end
puts "Done...🥳"




