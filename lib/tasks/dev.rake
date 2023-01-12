namespace :dev do
  
  desc "Populando banco de dados"
  task setup: :environment do
    puts "################### Iniciando Task ###################"
    10.times do |i|
      Task.create!(
        title: Faker::Lorem.paragraph,
        done: [true, false].sample
      )
    end
    puts "################### Task Concluída ###################"
  end
end