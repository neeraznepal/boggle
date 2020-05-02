# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

dictionaryData = []
open("db/dictionary.txt") do |lines|
    lines.read.each_line do |line|
        d = Dictionary.new
        d.word = line.strip
        dictionaryData.push(d)
    end
end

Dictionary.transaction do
    Dictionary.delete_all
    dictionaryData.each do |dictionary|
        dictionary.save!
    end
end


puts "#{dictionaryData.count} inserted"

